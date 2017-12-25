class ConfirmType {
  private confirm;

  constructor (confirm) {
    this.confirm = confirm;
  }

  public successType ({content = '', title = ''} = {}) {
    return new Promise((resolve, reject) => {
      this.confirm(content, title, {
        showCancelButton: true,
        type: 'success'
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public errorType ({content = '', title = ''} = {}) {
    return new Promise((resolve, reject) => {
      this.confirm(content, title, {
        showCancelButton: true,
        type: 'error'
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public warningType ({content = '', title = ''} = {}) {
    return new Promise((resolve, reject) => {
      this.confirm(content, title, {
        showCancelButton: true,
        type: 'warning'
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log('reject', err)
        reject(err)
      })
    })
  }

  public infoType ({content = '', title = ''} = {}) {
    return new Promise((resolve, reject) => {
      this.confirm(content, title, {
        showCancelButton: true,
        type: 'info'
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

class ConfirmHelper {
  private static confirm: ConfirmType;

  public static initialize (confirm) {
    ConfirmHelper.confirm = new ConfirmType(confirm);
  }

  public static successMessage (content: string, title: string) {
    return new Promise((resolve, reject) => {
      ConfirmHelper.confirm.successType({content, title}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public static errorMessage (content: string, title: string) {
    return new Promise((resolve, reject) => {
      ConfirmHelper.confirm.errorType({content, title}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public static warningMessage (content: string, title: string) {
    return new Promise((resolve, reject) => {
      ConfirmHelper.confirm.warningType({content, title}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  public static infoMessage (content: string, title: string) {
    return new Promise((resolve, reject) => {
      ConfirmHelper.confirm.infoType({content, title}).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export {
  ConfirmHelper
}
