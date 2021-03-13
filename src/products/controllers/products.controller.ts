import express from 'express';

export class ProductsController{

    listProducts(req:express.Request,res:express.Response){
        res.status(200).send('Get to products');
    }

}