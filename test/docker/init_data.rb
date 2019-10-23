#!/usr/bin/env ruby
u = User.first

t = PersonalAccessToken.new({ user: u, name: 'node-gitlab', scopes: ['api']}) 
t.save! 
 
puts t.token 
