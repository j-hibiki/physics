#swingby2.rb

sat_x = 0
sat_y = 0

JUP_X = 50
JUP_Y = 50

sat_vx = 2
sat_vy = 3

for i in 0..100

  dis_x = JUP_X - sat_x
  dis_y = JUP_Y - sat_y
  dis = (dis_x**2 + dis_y**2)**(0.5)

  puts "dis_x = #{dis_x}"
  puts "dis_y = #{dis_y}"
  puts "dis = #{dis}"

  sat_a = 100 / dis / dis

  sat_ax = sat_a * dis_x / dis
  sat_ay = sat_a * dis_y / dis

  sat_vx += sat_ax
  sat_vy += sat_ay

  sat_x = sat_x + sat_vx
  sat_y = sat_y + sat_vy

  puts "sat_x=#{sat_x}"
  puts "sat_y=#{sat_y}"
  puts ""
end
