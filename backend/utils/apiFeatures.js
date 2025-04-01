class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = {...this.queryString};
        const excludesFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludesFields.forEach((field) => delete queryStringObj[field]);

        // console.log(req.query);
        // console.log(queryStringObj);

        // Apply filtration
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            // price, -solid => [price, -solid] => price -solid
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }

        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fieldsLimit = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fieldsLimit);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let query = {};
            if (modelName === 'Products') {
                // i : not case sensitive
                query.$or = [
                    {title: {$regex: this.queryString.keyword, $options: 'i'}},
                    {description: {$regex: this.queryString.keyword, $options: 'i'}},
                ];
            } else {
                query = {name: {$regex: this.queryString.keyword, $options: 'i'}};
            }

            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }

    pagination(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const endPageIndex = page * limit; // 2*10 = 20

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;

        // number of pages
        pagination.numberOfPages = Math.ceil(countDocuments / limit);

        // next page
        if (endPageIndex < countDocuments) {
            pagination.next = page + 1;
        }

        // previous page
        if (skip > 0) {
            pagination.previous = page - 1;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;

        return this;
    }
}

module.exports = ApiFeatures;
