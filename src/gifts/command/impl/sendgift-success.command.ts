export class SendGiftSuccessCommand {
  constructor(
    public readonly id: number,
    public readonly battleid: string,
    public readonly trasectionid: string
  ) {}
}
