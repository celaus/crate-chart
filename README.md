# CHARTS FOR CRATE.IO

For simple analysis of arbitrary queries.

# HOWTO

First, install the plugin in the [Crate.IO](https://crate.io) admin interface by copying the folder to `$crate_location/plugins/crate-admin/_site/plugins` and adjusting the `plugins.json` accordingly (there should be a default Tutorials plugin).

Afterwards, start Crate.IO and go to `http://localhost:4200/admin`, navigate to the CHARTS plugin on the navbar (left). 

For displaying results, enter something like:  

```sql
select something as series, val1 as x, val2 as y from aDatabase order by 2;
```
and click "GO". Note the column aliases, they are important for receiving results. 


