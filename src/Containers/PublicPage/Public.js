import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})

export default function Public() {
    const classes = useStyles()
    const counter = useSelector(state => state.counter)

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image='la_la_land_silhouette-wide.jpg'
                    title="la la land"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {counter}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Login to use Counter App!
            </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}