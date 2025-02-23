## Crear un tag anotado (recomendado) o un tag ligero
```bash
git tag -a v1.0.1 -m "Version 1.0.1"
```

```bash
git tag v1.0.1
```

## Push tag to remote repo
```bash
git push origin v1.0.1
```

## Eliminar un tag localmente:
```bash
git tag -d v1.0.1
```

## Eliminar un tag del remoto:
```bash
git push origin --delete v1.0.1
```