import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const subimitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
  it('should be able to subimit a feedback', async () => {
    await expect(subimitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })
  
  it('should be not able to submit without type', async () => {
    await expect(subimitFeedback.execute({
      type: '',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

  it('should be not able to submit without comment', async () => {
    await expect(subimitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow()
  })

  it('should be not able to submit with an invalid screenshot', async () => {
    await expect(subimitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado',
      screenshot: 'teste.png'
    })).rejects.toThrow()
  })
})