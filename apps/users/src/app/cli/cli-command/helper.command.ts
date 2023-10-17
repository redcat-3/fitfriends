import { CliCommandInterface } from '@project/shared/shared-types';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.bgBlue('Программа для подготовки данных для REST API сервера.'));
    console.log(chalk.bgGreen(`Пример:
    main.js --<command> [--arguments]
    `));
    console.log(chalk.yellow(`Команды:
    --version:                   # выводит номер версии приложения
    --help:                      # печатает этот текст
    --fill-db <n> <uri>  # генерирует <n> тестовых данных, заполняет БД, с которой устанавливается контакт через <uri>
`));
  }
}
