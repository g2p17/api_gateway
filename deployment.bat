heroku login
heroku create parkingweb-apigateway
heroku container:login
heroku container:push web --app parkingweb-apigateway
heroku container:release web --app parkingweb-apigateway