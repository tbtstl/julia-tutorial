import PlotlyJS

n = 3
u = linspace(0, 2pi, n)
v = linspace(0, pi, n)

r = 1
x = cos(u) * sin(v)'
y = sin(u) * sin(v)'
z = repeat(cos(v)', outer=[n, 1])

PlotlyJS.plot([PlotlyJS.surface(x=x, y=y, z=z)])
