const { Router } = require( 'express' );
const passport = require( 'passport' );

const router = Router();

router.route( '/' )
    .get( ( req, res, next ) => {
        res.render( 'index' );
    } );

router.route( '/signin' )
    .get( ( req, res, next ) => {
        res.render( 'signin' );
    } )
    .post( passport.authenticate( 'local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    } ) );

router.route( '/signup' )
    .get( ( req, res, next ) => {
        res.render( 'signup' );
    } )
    .post( passport.authenticate( 'local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    } ) );

router.route( '/profile' )
    .get( isAuthenticated, ( req, res, next ) => {
        res.render( 'profile' );
    } );

router.route( '/logout' )
    .get( ( req, res, next ) => {
        req.logout();
        res.redirect( '/' );
    } );

function isAuthenticated( req, res, next ){
    if ( req.isAuthenticated() ){
        return next();
    }
    res.redirect( '/' );
}


module.exports = router;