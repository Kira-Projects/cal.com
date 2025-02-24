## Crear un tag anotado (recomendado) o un tag ligero
```bash
git tag -a v1.0.3 -m "Version 1.0.3"
```

```bash
git tag v1.0.3
```

## Push tag to remote repo
```bash
git push origin v1.0.3
```

## Eliminar un tag localmente:
```bash
git tag -d v1.0.3
```

## Eliminar un tag del remoto:
```bash
git push origin --delete v1.0.3
```