## Para levantar en local
1. Entrar a migraciones y cambiar agendix. por public. (una vez terminado el desarrollo volver a agendix.)
2. Si lanza error por el .env de prisma, hay que copiar el .env del root y pegarlo en el /packages/prisma/.env
3. Si lanza error iniciando la aplicación con yarn dx es decir levantando el contenedor, hay que eliminar el contenedor y el volumen

## Crear un tag anotado (recomendado) o un tag ligero
```bash
git tag -a v1.0.8 -m "Version 1.0.8"
```

```bash
git tag v1.0.8
```

## Push tag to remote repo
```bash
git push origin v1.0.8
```

## Eliminar un tag localmente:
```bash
git tag -d v1.0.8
```

## Eliminar un tag del remoto:
```bash
git push origin --delete v1.0.8
```