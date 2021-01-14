const mongoose = require("mongoose")

const purchaseHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    products:[
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema)