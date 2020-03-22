#!/usr/bin/env ruby
u = User.first
u.admin = true
u.save!

t = PersonalAccessToken.new({ user: u, name: 'gitbeaker', scopes: ['api', 'read_user']}) 
t.save! 
 
puts t.token 
