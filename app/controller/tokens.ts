import { Controller, DefaultConfig } from 'egg';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

interface SessionInfo {
  openid: string;
  unionid: string;
  token?: string;
}
export default class Token extends Controller {
  /**
   * 登录获取openid,unionid与token
   */
  public async create() {
    const { ctx, config } = this;
    const wxRes = await ctx.service.wechat.jscode2session(ctx.request.body['code']);
    if ((wxRes as WX.Error).errcode) { ctx.throw(422, {errors: wxRes}); }
    const exp: number = moment().add(30, 'days').unix();
    const token: string = jwt.sign({ ...wxRes, exp }, (config as DefaultConfig).jwt.secret);
    const res: SessionInfo = {
      token,
      openid: (wxRes as WX.Session).openid,
      unionid: (wxRes as WX.Session).unionid,
    };
    ctx.body = res;
    ctx.status = 201;
  }
}
