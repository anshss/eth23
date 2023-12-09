CREATE TABLE IF NOT EXISTS model_account_created (
    "evt_tx_hash" VARCHAR(64),
    "evt_index" INT,
    "evt_block_time" TIMESTAMP,
    "evt_block_number" DECIMAL,
    "model_id" DECIMAL,
    "tba" VARCHAR(40),
    PRIMARY KEY(evt_tx_hash,evt_index)
);
CREATE TABLE IF NOT EXISTS model_listed_for_sale (
    "evt_tx_hash" VARCHAR(64),
    "evt_index" INT,
    "evt_block_time" TIMESTAMP,
    "evt_block_number" DECIMAL,
    "model_id" DECIMAL,
    "price" DECIMAL,
    "tba" VARCHAR(40),
    PRIMARY KEY(evt_tx_hash,evt_index)
);
CREATE TABLE IF NOT EXISTS model_purchased (
    "evt_tx_hash" VARCHAR(64),
    "evt_index" INT,
    "evt_block_time" TIMESTAMP,
    "evt_block_number" DECIMAL,
    "model_id" DECIMAL,
    "new_owner" VARCHAR(40),
    "tba" VARCHAR(40),
    PRIMARY KEY(evt_tx_hash,evt_index)
);

