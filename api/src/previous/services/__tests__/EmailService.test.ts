import { EmailService } from "../EmailService";

describe("EmailService", () => {

  it("should send a verification email", async () => {
    const to = "totonlionel@gmail.com";

    const token = "test-token";

    const spy = jest.spyOn(EmailService, "sendVerificationEmail").mockResolvedValue();

    await EmailService.sendVerificationEmail(to, token);

    expect(spy).toHaveBeenCalledWith(to, token);
    spy.mockRestore();
  });
});


describe("Send a real email", () => {
  it("should send a real email", async () => {
    const to = "totonlionel@gmail.com";

    const firstName = "LIONEL";
    const lastName = "TOTON";
    
    const result = await EmailService.sendWelcomeEmail(to, firstName, lastName);
    
    expect(result).toBe(true);
  });
});