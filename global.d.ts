type Env = Partial<Readonly<typeof import("./.env")>>;

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly S3_PROFILE_IMAGE_URL?: URL;
  }
}