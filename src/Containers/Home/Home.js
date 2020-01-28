import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { actions } from '../../redux/counter'


const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})

export default function Home() {
    const classes = useStyles()
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="la_la_land_silhouette-wide.jpg"
                    title="la la land"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {counter}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Welcome logged in user!
                        You can use this feature rich counter app now!!
            </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => dispatch(actions.increment())}>
                    Increment ++
          </Button>
                <Button size="small" color="primary" onClick={() => dispatch(actions.decrement())}>
                    Decrement --
          </Button>
            </CardActions>
        </Card>
    )
}