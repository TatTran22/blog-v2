CREATE FUNCTION handle_inserted_channel() RETURNS trigger AS $$
BEGIN
  INSERT INTO channel_members (channel_id, user_id)
  VALUES (NEW.id, NEW.created_by);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER on_channel_inserted
AFTER INSERT ON channels
FOR EACH ROW EXECUTE PROCEDURE handle_inserted_channel();
