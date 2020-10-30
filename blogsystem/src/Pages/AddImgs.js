import React from "react";
import servicePath from '../config/apiUrl'

function AddImgs() {
  return (
      <div>
          <form action="http://127.0.0.1:7001/admin/uploadImg" method="post" enctype="multipart/form-data">
            <input type="file" name="avatar" accept="image/*" />
            <input type="submit" value="上传" />
          </form>
      </div>
  )
}


export default AddImgs;
