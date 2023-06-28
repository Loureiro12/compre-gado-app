import React from 'react'

import { Container, Loading } from './styles'

export function LoadingScreen(){
   return (
      <Container>
        <Loading color="red" size={28}/>
      </Container>
   );
}