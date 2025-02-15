# Getting Started

```js
const builder = require( 'joi-json' ).builder();

let jsonSchema = {

    firstName: 'string:min=1,max=60,required',  // string using string-based notation

    lastName: { // string using object notation

        '@type': 'string',
        min: 1,
        max: 60,
        required: true
    },

    address: {  // address is an object (i.e. joi.object() )

        street: 'string:min=1,max=80,required',
        street2: 'string:min=1,max=80',
        city: 'string:min=1,max=40,required',
        state: 'string:min=1,max=40,required',
        postal: 'string:min=1,max=20,required',

        '@required': true   // needs the '@' to indicate that "required" is a property
    },

    // alternative values (i.e. joi.alternatives().try() )
    favNumberOrWord: [

        'string:min=1,max=10',
        'number:min=0,max=100'
    ]
};

let schema = builder.build( jsonSchema );
```

Which would yield the equivalent to the following `joi` schema:

```js

const joi = require( 'joi' );

let schema = {

    firstName: joi.string().min(1).max(60).trim().required(),

    lastName: joi.string().min(1).max(60).trim().required(),

    address: Object.keys( {

            street: joi.string().min(1).max(80).trim().required(),
            street2: joi.string().min(1).max(80).trim(),
            city: joi.string().min(1).max(40).trim().required(),
            state: joi.string().min(1).max(40).trim().required(),
            postal: joi.string().min(1).max(20).trim().required()

        }).required(),

    favNumberOrWord: [

            joi.string().min(1).max(10).trim(),
            joi.number().min(1).max(100)
        ]
};
```

**Note:** Strings are automatically trimmed when using Joi-JSON. To prevent strings from being trimmed, add `trim=false` to your set of properties.
