const stdout = process.stdout;
stdout.cork();
stdout.write('xxxx');
stdout.cork();
stdout.write('xxxx');
stdout.uncork();