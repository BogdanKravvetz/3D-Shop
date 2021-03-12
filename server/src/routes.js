
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductsController = require('./controllers/ProductsController')
const { v4: uuidv4 } = require('uuid');
// const UploadController = require('./controllers/UploadController')

const multer = require('multer')
const fileFilter = function (req, file, callback) {

    const allowedTypes = [".glb", ".gltf", "application/octet-stream"]

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type")
        error.code = "LIMIT_FILE_TYPES"
        return callback(error, false)
    }
    callback(null, true)
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
      },
    filename: function (req, file, cb) {
        if (file.originalname.includes('.glb')) {
            cb(null, uuidv4()+'.glb')

        }
        if(file.originalname.includes('.gltf')){
            cb(null,uuidv4()+'.gltf')
        }
    }
})
// const filename = function (req, file, cb) {
//     if (file.originalname.includes('.glb') || file.originalname.includes('.gltf')) {
//         console.log('IT HAS GLB !!!!!!!!?!?!?!?!?!?!?!?!?!!?!?!')
//         cb(null, file.originalname)
//     }
//     console.log('NOOOOOOOOOOO GLB')
//     cb(null, false)

// }
const MAX_SIZE = 1024 * 50000


const upload = multer({
    // dest: './uploads/',
    storage: storage,
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }

})


module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.send({ message: "Yah, it's working!" });
    });

    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    app.get('/products', ProductsController.getAllProducts)
    app.post('/products', ProductsController.createProduct)
    app.get('/products/:productId', ProductsController.getProduct)
    app.put('/products/:productId', ProductsController.putProduct)

    app.post('/upload', upload.single('file'), ProductsController.adminUpload)
    app.use(ProductsController.uploadError)
}
