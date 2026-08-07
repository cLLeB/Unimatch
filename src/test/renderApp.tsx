import { render, type RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { AuthProvider } from '../state/AuthProvider'
import { InMemoryStudentRepository } from '../state/repository'
import { StudentProvider } from '../state/StudentProvider'

export interface RenderAppResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>
  repository: InMemoryStudentRepository
}

/** Render the real app, at a real route, with real providers. */
export function renderApp(initialRoute = '/'): RenderAppResult {
  const repository = new InMemoryStudentRepository()
  // No inter-keystroke delay: these flows fill ten selects, and the realistic
  // delay pushes them past the test timeout without testing anything extra.
  const user = userEvent.setup({ delay: null })

  const result = render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <StudentProvider repository={repository}>
          <App />
        </StudentProvider>
      </AuthProvider>
    </MemoryRouter>,
  )

  return { ...result, user, repository }
}
