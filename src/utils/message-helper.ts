class MessageType {
  private message;

  constructor (message) {
    this.message = message;
  }

  public successType (content) {
    this.message({
      type: 'success',
      message: content
    });
  }

  public errorType (content) {
    this.message({
      type: 'error',
      message: content
    });
  }

  public warningType (content) {
    this.message({
      type: 'warning',
      message: content
    })
  }

  public infoType (content) {
    this.message({
      type: 'info',
      message: content
    })
  }
}

class MessageHelper {
  private static message: MessageType;

  public static initialize (message) {
    MessageHelper.message = new MessageType(message);
  }

  public static successMessage (content) {
    MessageHelper.message.successType(content);
  }

  public static errorMessage (content) {
    MessageHelper.message.errorType(content);
  }

  public static warningMessage (content) {
    MessageHelper.message.warningType(content)
  }

  public static infoMessage (content) {
    MessageHelper.message.infoType(content)
  }
}

export {
  MessageHelper
};
