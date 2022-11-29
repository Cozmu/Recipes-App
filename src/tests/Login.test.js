import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';

describe('Testes da tela de login', () => {
  test('Testa se ha dois inputs, e se o botao esta desativado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(emailInput, 'joao@hotmail.com');
    expect(btnLogin).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(btnLogin).toBeEnabled();
  });
});
