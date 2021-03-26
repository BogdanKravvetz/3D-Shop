
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductsController = require('./controllers/ProductsController')
const TagsController = require('./controllers/TagsController')
const ColorsController = require('./controllers/ColorsController')
const ProductTagController = require('./controllers/ProductTagController')

const { v4: uuidv4 } = require('uuid');
const multer = require('multer')

// const isAuthenticated = require('./policies/isAuthenticated')

const fileFilter = function (req, file, callback) {

    const allowedTypes = [".glb", ".gltf", "application/octet-stream"]
    //is the file allowed?
    //if not callback with error
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type")
        error.code = "LIMIT_FILE_TYPES"
        return callback(error, false)
    }
    callback(null, true)
}
//storage settings for multer middleware
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
//upload file max size
const MAX_SIZE = 1024 * 50000

//multer instance setup with setting
const upload = multer({
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
    //authentication end points
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    //products end points
    app.get('/products', ProductsController.getAllProducts)
    app.post('/products', ProductsController.createProduct)
    app.get('/products/:productId', ProductsController.getProduct)
    app.put('/products/:productId', ProductsController.putProduct)

    //upload end points
    app.post('/upload', upload.single('file'), ProductsController.adminUpload)
    app.use(ProductsController.uploadError)

    //tags end points
    app.get('/tags', TagsController.getAllTags)
    app.post('/tags', TagsController.createTag)
    app.get('/tags/:tagId', TagsController.getTag)
    app.put('/tags/:tagId', TagsController.putTag)

    //colors end point
    app.get('/colors', ColorsController.getAllColors)
    app.post('/colors', ColorsController.createColor)
    app.get('/colors/:colorId', ColorsController.getColor)
    app.put('/colors/:colorId', ColorsController.putColor)

    //ProductTags end points
    app.get('/productTags',ProductTagController.getAllProductTags)
    // app.get('/productTags/:tagId',ProductTagController.getProductsWithTag)
    app.post('/productTags',ProductTagController.createProductTags)
    app.get('/productTags/:productId', ProductTagController.getProductTags)
    app.put('/productTags/:productTagsId', ColorsController.putColor)
}
