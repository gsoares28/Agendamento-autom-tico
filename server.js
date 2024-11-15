const handleSubmit = (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const date = formData.get("date");
  const time = formData.get("time");
  const service = formData.get("service");
  

  // Resetando as mensagens de erro e sucesso
  
  setErrorMessage("");
  setSuccessMessage("Seu agendamento foi feito com sucesso!");

  // Verificação de data no passado
  
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (selectedDateTime < now) {
    setErrorMessage("Erro: A data e o horário devem ser no futuro.");
    return;
  }

  // Verificação de conflito de horário

  const hasConflict = appointments.some(
    (appointment) => appointment.date === date && appointment.time === time
  );

  if (hasConflict) {
    setErrorMessage("Erro: Este horário já está agendado. Escolha outro horário.");
    return;
  }

  // Enviando o agendamento para o backend se as validações forem aprovadas

  axios.post("http://localhost:5000/api/appointments", { name, date, time, service })
  .then(response => {
    console.log("Resposta do servidor:", response); 
    if (response.status === 200 && response.data) {
      setAppointments([...appointments, response.data]);
      setSuccessMessage("Agendamento realizado com sucesso!"); // Mensagem de sucesso
    } else {
      setErrorMessage("Erro: Agendamento não foi processado corretamente.");
    }
  })
  
};
