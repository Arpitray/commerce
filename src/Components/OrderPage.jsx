const { data: orders } = await supabase
  .from('orders')
  .select('*, order_items(*, products(*)), profiles(email)')
