import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'


export default function NotFound() {

    return (
        <Container component="main" maxWidth="xs">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        404 Page Not Found
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}