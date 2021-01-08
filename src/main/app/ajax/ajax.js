class Ajax {
  constructor () {
    this.apiHost = this.switchHost()
  }

  switchHost () {
    let host = location.hostname
    if (host.startsWith('localhost')) {
      return 'http://localhost:9000/'
    } else {
      return location.protocol + '//api-' + location.hostname + '/'
    }
  }

  ajax (loading = true) {
    return axios.create({
      baseURL: this.apiHost,
      transformRequest: [function (data) {
        if (loading) {
          $.blockUI({
            message: '<img src="/images/loading.gif" alt="Wait...">',
            css: {
              border: 'none',
              padding: '15px',
              backgroundColor: 'transparent',
              '-webkit-border-radius': '10px',
              '-moz-border-radius': '10px',
              opacity: 0.5,
              color: '#fff',
              'z-index': 9999999999999999
            },
            overlayCSS: {
              backgroundColor: '#000',
              opacity: 0.6,
              cursor: 'wait',
              'z-index': 9999999999999999
            }
          })
        }
        return data;
      }],
      transformResponse: [function (data) {
        if (loading) {
          $.unblockUI()
        }
        return data;
      }],
      responseType: 'json',
      crossDomain: true,
      withCredentials: true,
    })
  }
}

export default Ajax

