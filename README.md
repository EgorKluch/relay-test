### Как запустить
* Клонировать репозиторий
* Выполнить команду ```yarn install```
* Выполнить команду ```yarn relay```
* Выполнить команду ```yarn start```
* Если запросы к dadata будут падать с 403 ошибкой - в src/config подставить свой токен


### Что осталось сделать

##### Не обновляется AddressesField на refetch
При изменении поля адреса в AddressesField происходит успешный запрос к мокам и данные сохраняются в Store.
При этом, AddressesField не перерендеривается, не успел понять почему 

##### Не реализованы мутаций 
Добавил мутацию addAddressToUser в models, но не успел добавить в React-компонени и протестировать

##### Ошибка в RelayObservable при быстром изменении значения инпута AddressesField
```
Uncaught ReferenceError: r is not defined
   at Object.unsubscribe (<anonymous>:1:2238)
   at Object.unsubscribe (RelayObservable.js:217)
```
В AddressesField пришлось использовать debounce: при быстром наборе текста в input падает ошибка в RelayObservable.

С точки зрения нагрузки на сервер возможно это и плюс - но пока не понял источник ошибки не могу гарантировать,
 что она не будет возникать при каких-то кейсах

##### Остались вопросы к архитектуре
В корневом элементе я указываю один большой фрагментированный query, и 
потом при получении ответа все props прокидываю каскадом вниз.
В случае большого приложения, вижу 2 проблемы:
* Аргументов и фрагментов может быть очень много. Например, работать с query с 30 аргументами 
может быть не очень удобно. Например, тот же аргумент addresses нужен только для AddressesField,
и, возможно, лучше, что бы только AddressesField о нем и знал 
* Каскад пропсов с ростом приложения может превратиться в ад, потому что запомнить
и понять какие нужны на каком уровне компонентов будет уже сложно. В redux это мультиконнектом
легко решается - запрашиваются только те пропсы, которые нужны в текущем компоненте, не заботясь
о дочерних элементах (они сами все получат, кроме common-компонентов)
