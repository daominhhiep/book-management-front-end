import React from 'react'
import {Link} from 'react-router'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="clear">
        <div id="fof" class="clear">
          <div class="hgroup">
            <h1>Trang bạn đang tìm kiếm không được tìm thấy.</h1>
          </div>
          <hr/>
          <p>Chúng tôi xin lỗi về việc này </p>
          <p>Liên hệ với quản trị viên để nhận sự giúp đỡ</p>
        </div>
      </div>
    )
  }
}

export default NotFoundPage
