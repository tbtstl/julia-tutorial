import PlotlyJS

n = 50
u = linspace(0, 2pi, n)
v = linspace(0, 2pi, n)
r = 1
x = r * cos(u) * sin(v)'
y = r * sin(u) * sin(v)'
z = repeat(r * cos(v)', outer=[n, 1])

PlotlyJS.plot([PlotlyJS.surface(x=x, y=y, z=z)])
