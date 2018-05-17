#!/usr/bin/env ruby
u = User.first
u.password_automatically_set = false 
u.password = 'password' 
u.password_confirmation = 'password' 
u.save! 

t = PersonalAccessToken.new({ user: u, name: 'node-gitlab', scopes: ['api']}) 
t.save! 
 
puts t.token 