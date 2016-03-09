#swingby2.rb

sat_x = 0
sat_y = 0

JUP_X = 50
JUP_Y = 50

sat_vx = 2
sat_vy = 3
v_start = (sat_vx*sat_vx + sat_vy*sat_vy)**0.5

for i in 0..20

  dx = JUP_X - sat_x
  dy = JUP_Y - sat_y
  dist = (dx*dx + dy*dy)**0.5

  # puts "dist_x = #{dist_x}"
  # puts "dist_y = #{dist_y}"
  # puts "dist = #{dist}"

  sat_a = 1000 / dist / dist

  sat_ax = sat_a * dx / dist
  sat_ay = sat_a * dy / dist

  sat_vx += sat_ax
  sat_vy += sat_ay

  sat_x = sat_x + sat_vx
  sat_y = sat_y + sat_vy

  puts "sat_x=#{sat_x}"
  puts "sat_y=#{sat_y}"
  puts ""

end

v_end = (sat_vx*sat_vx + sat_vy*sat_vy)**0.5
got_speed = v_end - v_start

puts "you got #{got_speed} by swingby"