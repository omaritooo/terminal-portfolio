export type Command = {
  cmd: string;
  desc: string;
  tab: number;
};

export const commands: Command[] = [
  { cmd: 'welcome', desc: 'display hero section', tab: 6 },
  { cmd: 'help', desc: 'check available commands', tab: 9 },
  { cmd: 'about', desc: 'about Omar Ashraf', tab: 8 },
  { cmd: 'email', desc: 'send an email to me', tab: 8 },
  { cmd: 'socials', desc: 'check out my social accounts', tab: 6 },
  { cmd: 'education', desc: 'my education background', tab: 4 },
  { cmd: 'experience', desc: 'my work experience', tab: 3 },
  { cmd: 'stack', desc: 'my tech stack', tab: 8 },
  { cmd: 'projects', desc: "view projects that I've coded", tab: 5 },
  { cmd: 'gui', desc: 'go to my portfolio in GUI', tab: 10 },
  { cmd: 'themes', desc: 'check available themes', tab: 7 },
  { cmd: 'history', desc: 'view command history', tab: 6 },
  { cmd: 'clear', desc: 'clear the terminal', tab: 8 },
];
