// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Image,
  MarkdownSlides,
  GoToAction,
  Code,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Images
import sphere from './sphere.png';
import sphericalCoords from './spherical_coordinates.png';
import sphericalCoordsCartesian from './spherical_coordinates_cartesian.png';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    quartenary: '#001B44',
    secondary: '#5E2CA5',
    tertiary: '#FFD700',
    primary: '#FFFCEB',
  },
  {
    primary: 'Roboto',
    secondary: 'Roboto',
  }
);


export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
        progress="pacman"
      >
        <Slide progressColor="secondary" controlColor="secondary" transition={['zoom']} bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Plotting a 3D Sphere in Julia
          </Heading>
          <Image src={sphere}/>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']}>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            This tutorial assumes three things: That you have Julia installed, Atom installed, and the uber-juno
            Atom package installed. If you do not, follow the instructions &nbsp;
            <a href="https://github.com/JunoLab/uber-juno/blob/master/setup.md">here</a> before continuing.
          </Text>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']}>
          <Heading size={2}>
            Contents
          </Heading>
          <List ordered>
            <ListItem><GoToAction slide={4} textColor="quartenary" bgColor="primary">Spherical Coordinates</GoToAction></ListItem>
            <ListItem><GoToAction slide={7} textColor="quartenary" bgColor="primary">Representing Coordinates in Julia</GoToAction></ListItem>
            <ListItem><GoToAction slide={13} textColor="quartenary" bgColor="primary">References</GoToAction></ListItem>
          </List>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Heading size={1} fit textColor="secondary" bgColor="primary">
            Spherical Coordinates
          </Heading>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Spherical Coordinates determine the position of a point in three-dimensional space
            based on the distance  ρ from the origin and two angles θ and ϕ.
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Spherical coordinates for some point P are defined as indicated below:
          </Text>
          <Image src={sphericalCoords}/>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            The coordinate ρ is the distance from P to the origin.
            If the point Q is the projection of P to the xy-plane,
            then θ is the angle between the positive x-axis and the
            line segment from the origin to Q.
            Lastly, ϕ is the angle between the positive z-axis and
            the line segment from the origin to P.
          </Text>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Using trigonometry, we can calculate the relationship between the
            Cartesian coordinates (x,y,z) of the point P and its spherical coordinates
            (ρ,θ,ϕ). The red and cyan triangles in the image below form two right triangles,
            which we can use to calculate coordinates for x, y, and z.
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            From the triangles, we can see that the formulas for the Cartesian coordinates
            in terms of the spherical coordinates are:
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            x = ρ sin(ϕ) cos(θ)
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            y = ρ sin(ϕ) sin(θ)
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            z = ρ cos(ϕ)
          </Text>
          <Image src={sphericalCoordsCartesian}/>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Heading size={1} fit textColor="secondary" bgColor="primary">
            Representing Coordinates in Julia
          </Heading>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            To be able to represent sets of coordinates in Julia, we need to have a basic understanding of ranges.
            A range is a set of n linearly spaced elements from a starting point to a stopping point. A range can
            be constructed with Julia with the <Code textSize="0.75em">linspace(start, stop, n)</Code> function. For example, to
            create a range [0, 1, 2, 3, 4], we can do the following:
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">range = linspace(0, 4, 5)</Code>
          </Text>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em">
            We can apply the linspace function to get a range of values for θ and ϕ from the equations above.
            Let's get 50 values for each, ranging from 0 to 2pi. To make the code easier to reproduce, we'll
            represent θ as v and ϕ as u. We also need a radius, ρ, which we'll call r and set to 1.
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">u = linspace(0, 2pi, 50)</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">v = linspace(0, 2pi, 50)</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">r = 1</Code>
          </Text>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Next, we need to convert our spherical coordinates into Cartesian coordinates so they can be plotted easier.
            In order to multiply our ranges into matrices of coordinates, we need to treat them as vectors.
            Therefore, one of the vectors will need to be transposed. This can be accomplished with Julia's ' operator
            on a vector. In addition, we need to make use of Julia's repeat() function. repeat() constructs a vector by
            repeating the entries passed to it. "outer" is a special parameter for repeat() that, in our case, says that
            for every n elements, a slice along the 1st dimension of the vector should be repeated.
            Putting this altogether in code, we have:
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">x = r * cos(u) * sin(v)'</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">y = r * sin(u) * sin(v)'</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">z = repeat(r*cos(v)', outer=[n, 1])</Code>
          </Text>
        </Slide>
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} textColor="quartenary" bgColor="primary">
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Alright, let's look back at what we've done so far. We've taken samples of values of ϕ and θ from 0 to 2pi,
            and turned them into matrices Cartesian coordinates in x, y, and z. All we have left to do is construct a
            plot so we can visualize our plot. To do this, let's tell Julia that we want to use a plotting library in our
            code:
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            <Code textSize="0.75em">import PlotlyJS</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            Done. Julia now knows that we plan to use the library PlotlyJS and has made it available for us to use.
            Now all we need to do is get our plot. This is done by telling PlotlyJS that we want a surface plot with
            our coordinates:
            <Code textSize="0.75em">PlotlyJS.plot([PlotlyJS.surface(x=x, y=y, z=z)])</Code>
          </Text>
          <Text textSize="0.75em" textColor="quartenary" bgColor="primary">
            And that's it! We should end up with a plot looking like the image below.
          </Text>
          <Image src={sphere}/>
        </Slide>
        {MarkdownSlides`
          If you followed this tutorial, your code should look something like this:

          import PlotlyJS

          n = 3
          u = linspace(0, 2pi, n)
          v = linspace(0, pi, n)

          r = 1
          x = cos(u) * sin(v)'
          y = sin(u) * sin(v)'
          z = repeat(cos(v)', outer=[n, 1])

          PlotlyJS.plot([PlotlyJS.surface(x=x, y=y, z=z)])
        `}
        <Slide progressColor="secondary" controlColor="secondary" transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps bgColor="primary">
            References
          </Heading>
          <List>
            <ListItem><a href="http://mathinsight.org/spherical_coordinates#sphere_surf">Math Insight: Spherical Coordinates</a></ListItem>
            <ListItem><a href="https://docs.julialang.org/en/stable/">Julia Documentation</a></ListItem>
          </List>
          <Text>This tutorial was made by <a href="https://www.tysonbattistella.com">Tyson Battistella</a></Text>
        </Slide>
      </Deck>
    );
  }
}
