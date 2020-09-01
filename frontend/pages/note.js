<ul>
    {data.users.map(item => (
        <li key={item.id}>
            {item.name} id {item.id}
        </li>
    )
    )}
</ul>


<Query query={ALL_GUIDES_QUERY}>
    {(payload) => {
        console.log(payload);
        return <p>Hey I am a child</p>
    }}
</Query>