import multer from "multer";

export function uploadMiddleware() {
  const fileStorageEngine = multer.memoryStorage();
  return multer({ storage: fileStorageEngine });
}

export function uploadWithPathMiddleware() {
  var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, './uploads');
    },
    filename: function (request, file, callback) {
      var temp_file_arr = file.originalname.split(".");
      var temp_file_name = temp_file_arr[0];
      var temp_file_extension = temp_file_arr.pop();
      callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
    }
  });
  return multer({storage:storage});
}
