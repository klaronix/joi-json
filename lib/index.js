const { isString } = require( './utils' );

const Parser = require( './parser' );

const engine = require( 'joi' );

class SchemaBuilder {

    constructor( parser ) {

        this.parser = parser;
    }

    build( config ) {

        if( isString( config ) || config[ '@schema' ] ) {

            return this.parser.parse( config );
        }
        else {

            let schema = {};

            for( let key in config ) {

                let value = config[ key ];

                schema[ key ] = this.parser.parse( value );
            }

            return schema;
        }
    }
}

function parser( _engine ) {

    return new Parser( _engine || engine );
}

function builder( _engine ) {

    return new SchemaBuilder( parser( _engine ) );
}

module.exports = {

    builder,

    parser,
};
