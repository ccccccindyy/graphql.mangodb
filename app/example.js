const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString)
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',
    fields: () => ({
    name:{
        type:GraphQLString,
        resolve: authorXML =>
    authorXML.GoodreadsResponse.author[0].name[0]
},
    books:{
    type:new GraphQLList(BookType),
        resolve: bookXML =>
    bookXML.GoodreadsResponse.author[0].books[0].book
}
})
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: '...',
    fields: () => ({
    title:{
        type:GraphQLString,
        resolve: titleXML =>
    titleXML.title[0]
},
    isbn: {
    type:GraphQLString,
        resolve: isbnXML =>
    isbnXML.isbn[0]
}
})
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'Query',
        description: '...',
        fields: () => ({
        author:{
            type: AuthorType,
            args:{
                id: {type : GraphQLInt}
            },
            resolve: (root,args) => fetch(util.format('https://www.goodreads.com/author/show/%s?format=xml&key=XETRe83IEY5suDxiGpaZg', args.id))
            .then(response => response.text())
        .then(parseXML)
}
})
})
});