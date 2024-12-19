
export class MyConfig {

  configBd(): any {
    const config = {
      user: process.env.USER_BD,
      password: process.env.PASS_BD,
      server: process.env.SERVER_BD,
      database: process.env.NAME_BD,
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    };
    return config;
  }

  getAppId(): any {
    return process.env.APP;
  }
}