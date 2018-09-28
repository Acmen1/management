const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url, method, data, callBack) {
  var id_token = wx.getStorageSync('id_token');
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': id_token
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
function uploadimg(data, callback) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',
    formData: null,
    success: (resp) => {
      success++;
      callback(resp)
    },
    fail: (res) => {
    },
    complete: () => {
      i++;
      if (i == data.path.length) { //当图片传完时，停止调用   
      } else {//若图片还没有传完，则继续调用函数
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data, callback);
      }
    }
  });
}

module.exports = {
  formatTime: formatTime,
  http:http,
  uploadimg: uploadimg
}
