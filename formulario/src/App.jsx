// Components
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { FiSend } from 'react-icons/fi'
import UserForm from './components/UserForm'
import ReviewForm from './components/ReviewForm'
import Thanks from './components/Thanks'
import Steps from './components/Steps'

import './App.css'

// Styled Components
import { Container, Header, H2, FormContainer, Form, InputsContainer, Actions, P } from './Styles.jsx'

// Hooks
import { UseForm } from './hooks/UseForm'
import { useState } from 'react'


const formTemplate = {
  name: "",
  email: "",
  review: "",
  comments: ""
}

function App() {
  const [data, setData] = useState(formTemplate)

  const updateFielHandler = (key, value) => {
    setData((prev) => {
      return {...prev, [key]: value}
    })
  }

  const formComponents = 
  [<UserForm data={data} updateFielHandler={updateFielHandler} />, 
  <ReviewForm data={data} updateFielHandler={updateFielHandler} />, 
  <Thanks data={data} />]

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = UseForm(formComponents)

  return (
    <Container>

      <Header>
        <H2>Deixe sua avaliação</H2>
        <P>
          Ficamos felizes com sua compra, utilize o formulário abaixo para avaliar o produto
        </P>
      </Header>

      <FormContainer>
       <Steps currentStep={currentStep} />
          <Form onSubmit={(e) => changeStep(currentStep + 1, e)}>
            <InputsContainer>{currentComponent}</InputsContainer>
            <Actions>
              {!isFirstStep && (<button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Voltar</span>
              </button>)}
              {!isLastStep ? (<button type="submit">
                <span>Avançar</span>
                <GrFormNext />
              </button>) : (<button type="button">
                <span>Enviar</span>
                <FiSend />
              </button>)}
            </Actions>
          </Form>
      </FormContainer>

    </Container>

  )
}

export default App
