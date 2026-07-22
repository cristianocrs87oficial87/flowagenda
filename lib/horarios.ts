export function gerarHorarios(
  abertura: string,
  fechamento: string,
  intervalo: number
) {
  const horarios: string[] = [];

  const [horaInicial, minutoInicial] = abertura.split(":").map(Number);
  const [horaFinal, minutoFinal] = fechamento.split(":").map(Number);

  const inicio = new Date();
  inicio.setHours(horaInicial, minutoInicial, 0, 0);

  const fim = new Date();
  fim.setHours(horaFinal, minutoFinal, 0, 0);

  while (inicio < fim) {
    const hora = inicio.getHours().toString().padStart(2, "0");
    const minuto = inicio.getMinutes().toString().padStart(2, "0");

    horarios.push(`${hora}:${minuto}`);

    inicio.setMinutes(inicio.getMinutes() + intervalo);
  }

  return horarios;
}

export function filtrarHorariosDisponiveis(
  horarios: string[],
  ocupados: string[]
) {
  return horarios.filter((horario) => !ocupados.includes(horario));
}