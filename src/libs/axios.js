import axios from 'axios'
const http = {
  getRequest: function (url, params, headers = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: url,
        params: params,
        headers: headers
      }).then(
        response => {
          if (!response.data.success) {
            this.handleException(response.data)
          }
          resolve(response)
        },
        error => {
          this.handleException(error.response)
          reject(error)
        }
      )
    })
  },

  postRequest: function (url, params, ext = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, ext).then(
        response => {
          if (!response.data.success) {
            this.handleException(response.data)
          }
          resolve(response)
        },
        error => {
          this.handleException(error.response)
          reject(error)
        }
      )
    })
  },
  uploadRequest: function (url, params) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let formData = new FormData()
      formData.append(params.filename, params.file)
      axios.post(url, formData, config).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default http
